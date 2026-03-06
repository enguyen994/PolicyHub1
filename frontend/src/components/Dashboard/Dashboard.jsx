import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PolicyModal from '../PolicyModal/PolicyModal';

const CATEGORIES = ['All', 'HR', 'IT', 'Compliance', 'Finance'];
const DEPARTMENTS = ['All', 'Human Resources', 'Information Technology', 'Legal', 'Finance'];

function sanitizeSearchQuery(query) {
  if (!query) return '';
  return String(query).substring(0, 100).replace(/[<>'&"]/g, '');
}

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString || '';
  }
}

function HighlightedText({ text, query }) {
  if (!query || !text) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200 font-semibold">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function PolicyCard({ policy, searchQuery, onViewPolicy }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              <HighlightedText text={policy.name} query={searchQuery} />
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                {policy.category}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                v{policy.version}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">
          <HighlightedText text={policy.description} query={searchQuery} />
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{policy.department}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Effective: {formatDate(policy.effectiveDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Owner: {policy.owner}</span>
          </div>
        </div>
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => onViewPolicy(policy.id)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Policy
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterPanel({
  show,
  selectedCategory,
  selectedDepartment,
  searchQuery,
  onCategoryChange,
  onDepartmentChange,
  onClearFilters,
}) {
  const hasFilters = searchQuery || selectedCategory !== 'All' || selectedDepartment !== 'All';

  if (!show) return null;

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
          <div className="flex flex-wrap gap-2">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept}
                onClick={() => onDepartmentChange(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDepartment === dept
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dept === 'All' ? dept : dept.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear all filters
        </button>
      )}
    </div>
  );
}

export default function Dashboard({ user = 'User' }) {
  const navigate = useNavigate();

  const [policies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [modalPolicyId, setModalPolicyId] = useState(null);

  const filteredPolicies = useMemo(() => {
    let filtered = policies;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (policy) =>
          policy.name.toLowerCase().includes(query) ||
          policy.description.toLowerCase().includes(query) ||
          policy.department.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((policy) => policy.category === selectedCategory);
    }

    if (selectedDepartment !== 'All') {
      filtered = filtered.filter((policy) => policy.department === selectedDepartment);
    }

    return filtered;
  }, [policies, searchQuery, selectedCategory, selectedDepartment]);

  const modalPolicy = useMemo(
    () => (modalPolicyId ? policies.find((p) => p.id === modalPolicyId) : null),
    [policies, modalPolicyId]
  );

  const handleSearch = useCallback((e) => {
    setSearchQuery(sanitizeSearchQuery(e.target.value));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDepartment('All');
  }, []);

  const handleLogout = useCallback(
    (e) => {
      e.preventDefault();
      // POST to logout endpoint; adjust as needed for your backend
      fetch('/auth/logout', { method: 'POST', credentials: 'include' }).then(() => {
        navigate('/');
      });
    },
    [navigate]
  );

  // Close modal on Escape
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') setModalPolicyId(null);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h1 className="text-2xl font-bold">PolicyHub</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-100">
              Welcome, <strong className="text-white">{user}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <p className="text-blue-100">Find company policies and guidelines quickly</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search policies (e.g., 'vacation', 'remote work', 'security')..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
              <svg
                className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Filter Panel */}
          <FilterPanel
            show={showFilters}
            selectedCategory={selectedCategory}
            selectedDepartment={selectedDepartment}
            searchQuery={searchQuery}
            onCategoryChange={setSelectedCategory}
            onDepartmentChange={setSelectedDepartment}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Found <span className="font-semibold text-gray-900">{filteredPolicies.length}</span> policies
        </div>

        {/* Policy Cards */}
        <div className="grid gap-6">
          {filteredPolicies.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No policies found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          ) : (
            filteredPolicies.map((policy) => (
              <PolicyCard
                key={policy.id}
                policy={policy}
                searchQuery={searchQuery}
                onViewPolicy={setModalPolicyId}
              />
            ))
          )}
        </div>
      </div>

      {/* Policy Modal */}
      {modalPolicy && (
        <PolicyModal policy={modalPolicy} onClose={() => setModalPolicyId(null)} />
      )}
    </div>
  );
}
