import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import BackToTopButton from './BackToTop';

const PaginationDetails: React.FC = () => {
  const navigate = useNavigate();
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getGlassyClasses = (opacity = 20) => {
    return `backdrop-filter backdrop-blur-lg bg-white bg-opacity-${opacity} 
  border border-white border-opacity-20 rounded-lg shadow-lg transition-all duration-300`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(
        () => setCopiedStates(prev => ({ ...prev, [key]: false })),
        2000,
      );
    });
  };

  const CopyButton: React.FC<{ text: string; codeKey: string }> = ({
    text,
    codeKey,
  }) => (
    <button
      onClick={() => copyToClipboard(text, codeKey)}
      className={`absolute top-2 right-2 ${getGlassyClasses()} p-2 hover:bg-white/40 transition-all duration-300 z-10`}
      title='Copy to clipboard'
    >
      {copiedStates[codeKey] ? (
        <Check size={16} className='text-white' />
      ) : (
        <Copy size={16} className='text-white' />
      )}
    </button>
  );

  const basicPaginationCode = `
    <div className="flex justify-center items-center space-x-2" onClick={e => e.stopPropagation()}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={\`px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 \${ 
          currentPage === 1
          ? 'bg-gray-600 text-gray-500 cursor-not-allowed opacity-50'
          : 'bg-gray-600 text-white hover:bg-gray-700'
        }\`}
      >
        Previous
      </button>
  
      {currentPage > 2 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 bg-gray-600 text-white hover:bg-gray-700"
          >
            1
          </button>
          {currentPage > Math.floor(maxVisiblePages / 2) + 1 && (
            <span className="px-3 text-gray-400">...</span>
          )}
        </>
      )}
  
      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={\`px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 \${ 
            currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-700' 
          }\`}
        >
          {page}
        </button>
      ))}
  
      {currentPage < totalPages - Math.floor(maxVisiblePages / 2) && (
        <>
          {currentPage < totalPages - Math.floor(maxVisiblePages / 2) - 1 && (
            <span className="px-3 text-gray-400">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 bg-gray-600 text-white hover:bg-gray-700"
          >
            {totalPages}
          </button>
        </>
      )}
  
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={\`px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 \${ 
          currentPage === totalPages
          ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
          : 'bg-gray-600 text-white hover:bg-gray-700'
        }\`}
      >
        Next
      </button>
    </div>
  `;

  const paginationLogicCode = `
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10; // Set your total number of pages
  const maxVisiblePages = 4; // Maximum number of visible pages

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      console.log(\`Page changed to: \${page}\`);
    }
  };

  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };
`;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10; // Set your total number of pages
  const maxVisiblePages = 4; // Maximum number of visible pages

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      console.log(`Page changed to: ${page}`);
    }
  };

  const getVisiblePages = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className='min-h-screen p-8 font-sans bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white relative'>
      <BackToTopButton />
      <div className='relative z-10'>
        <button
          onClick={() => navigate(-1)}
          className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-white`}
        >
          <ArrowLeft size={20} className='mr-2' />
          Back to Components
        </button>

        <h1 className='text-6xl font-bold mb-8 text-white'>Pagination</h1>
        <p className='text-xl mb-8 text-white'>
          A responsive, glassmorphism styled pagination component.
        </p>

        {/* logical part Section */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>
            Pagination logic
          </h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {paginationLogicCode}
            </pre>
            <CopyButton text={paginationLogicCode} codeKey='paginationLogin' />
          </div>
        </div>

        {/* Basic Usage Section */}
        <div className={`${getGlassyClasses()} p-6 mb-14 relative`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Basic Usage</h2>
          <div className='relative'>
            <pre className='bg-gray-800 text-white p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
              {basicPaginationCode}
            </pre>
            <CopyButton text={basicPaginationCode} codeKey='basicPagination' />
          </div>
        </div>

        {/* Props Table */}
        <div className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-6 text-white'>Props</h2>
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-white bg-opacity-20'>
                  <th className='text-left p-2 text-white'>Prop</th>
                  <th className='text-left p-2 text-white'>Type</th>
                  <th className='text-left p-2 text-white'>Default</th>
                  <th className='text-left p-2 text-white'>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='p-2 text-white'>total</td>
                  <td className='p-2 text-white'>number</td>
                  <td className='p-2 text-white'>-</td>
                  <td className='p-2 text-white'>Total number of items</td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-white'>currentPage</td>
                  <td className='p-2 text-white'>number</td>
                  <td className='p-2 text-white'>1</td>
                  <td className='p-2 text-white'>The current active page</td>
                </tr>
                <tr>
                  <td className='p-2 text-white'>pageSize</td>
                  <td className='p-2 text-white'>number</td>
                  <td className='p-2 text-white'>10</td>
                  <td className='p-2 text-white'>Number of items per page</td>
                </tr>
                <tr className='bg-white bg-opacity-10'>
                  <td className='p-2 text-white'>onPageChange</td>
                  <td className='p-2 text-white'>function</td>
                  <td className='p-2 text-white'>-</td>
                  <td className='p-2 text-white'>Callback when page changes</td>
                </tr>
                <tr>
                  <td className='p-2 text-white'>maxVisiblePages</td>
                  <td className='p-2 text-white'>Number</td>
                  <td className='p-2 text-white'>5</td>
                  <td className='p-2 text-white'>Number of page to show</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Example */}
        <section className={`${getGlassyClasses()} p-6 mb-14`}>
          <h2 className='text-3xl font-bold mb-4 text-white'>
            Pagination Example
          </h2>
          <div
            className='flex justify-center items-center space-x-2'
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 ${
                currentPage === 1
                  ? 'bg-gray-600 text-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>

            {/* Conditionally show first page and ellipsis */}
            {currentPage > 2 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className='px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 bg-gray-600 text-white hover:bg-gray-700'
                >
                  1
                </button>
                {currentPage > Math.floor(maxVisiblePages / 2) + 1 && (
                  <span className='px-3 text-gray-400'>...</span>
                )}
              </>
            )}

            {/* Render visible pages */}
            {getVisiblePages().map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-600 text-white hover:bg-gray-600'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Conditionally show last page and ellipsis */}
            {currentPage < totalPages - Math.floor(maxVisiblePages / 2) && (
              <>
                {currentPage <
                  totalPages - Math.floor(maxVisiblePages / 2) - 1 && (
                  <span className='px-3 text-gray-400'>...</span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className='px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 bg-gray-600 text-white hover:bg-gray-700'
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full transition-colors duration-200 border border-gray-500 ${
                currentPage === totalPages
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaginationDetails;
