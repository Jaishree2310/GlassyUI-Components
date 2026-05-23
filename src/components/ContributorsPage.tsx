'use client';

import React, { useEffect, useState } from 'react';
import BackToTopButton from './BackToTop';
import { Users, Star, GitFork, GitCommit } from 'lucide-react';

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

interface RepoStats {
  stars: number;
  forks: number;
  contributors: number;
  totalCommits: number;
}

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [repoStats, setRepoStats] = useState<RepoStats>({
    stars: 0,
    forks: 0,
    contributors: 0,
    totalCommits: 0,
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let all: Contributor[] = [];
        let page = 1;
        while (true) {
          const res = await fetch(
            `https://api.github.com/repos/Jaishree2310/GlassyUI-Components/contributors?page=${page}&per_page=100`,
          );
          if (!res.ok) break;
          const data: Contributor[] = await res.json();
          if (data.length === 0) break;
          all = [...all, ...data];
          page++;
        }
        setContributors(all);

        const repoRes = await fetch(
          'https://api.github.com/repos/Jaishree2310/GlassyUI-Components',
        );
        const repo = await repoRes.json();

        setRepoStats({
          stars: repo.stargazers_count ?? 0,
          forks: repo.forks_count ?? 0,
          contributors: all.length,
          totalCommits: all.reduce((s, c) => s + c.contributions, 0),
        });
      } catch (err) {
        console.error('Error fetching contributors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(contributors.length / perPage);
  const current = contributors.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  function fmt(n: number) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return String(n);
  }

  return (
    <div className='contrib-root'>
      <div className='contrib-orb-1' />
      <div className='contrib-orb-2' />
      <BackToTopButton />

      {/* Hero */}
      <div className='contrib-hero'>
        <span className='section-label'>Open Source Community</span>
        <h1 className='contrib-hero-title'>Our Amazing Contributors</h1>
        <p className='contrib-hero-sub'>
          Shaping the future of GlassyUI, one commit at a time. Thank you to
          everyone who has contributed.
        </p>
      </div>

      {/* Stats */}
      <div className='contrib-stats'>
        <ContribStat
          icon={<Users size={22} />}
          value={fmt(repoStats.contributors)}
          label='Contributors'
          loading={loading}
        />
        <ContribStat
          icon={<GitCommit size={22} />}
          value={fmt(repoStats.totalCommits)}
          label='Total Commits'
          loading={loading}
        />
        <ContribStat
          icon={<Star size={22} />}
          value={fmt(repoStats.stars)}
          label='GitHub Stars'
          loading={loading}
        />
        <ContribStat
          icon={<GitFork size={22} />}
          value={fmt(repoStats.forks)}
          label='Forks'
          loading={loading}
        />
      </div>

      {/* Contributors grid */}
      <div className='contrib-section'>
        <h2 className='contrib-section-title'>Meet the Contributors</h2>

        {loading ? (
          <div className='contrib-loading'>
            <div className='contrib-spinner' />
            <p className='contrib-loading-text'>Loading contributors…</p>
          </div>
        ) : (
          <>
            <div className='contrib-grid'>
              {current.map(c => (
                <ContributorCard key={c.id} {...c} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className='cp-pagination' style={{ marginTop: 48 }}>
                <button
                  className='cp-page-btn'
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>
                <span style={{ color: '#64748b', fontSize: 13.5 }}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className='cp-page-btn'
                  onClick={() =>
                    setCurrentPage(p => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const ContribStat: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
  loading: boolean;
}> = ({ icon, value, label, loading }) => (
  <div className='contrib-stat-card'>
    <div className='contrib-stat-icon'>{icon}</div>
    <div>
      <div className='contrib-stat-value'>{loading ? '—' : value}</div>
      <div className='contrib-stat-label'>{label}</div>
    </div>
  </div>
);

const ContributorCard: React.FC<Contributor> = ({
  login,
  avatar_url,
  html_url,
  contributions,
  type,
}) => (
  <a
    href={html_url}
    target='_blank'
    rel='noopener noreferrer'
    className='contrib-card'
  >
    <div className='contrib-card-body'>
      <img src={avatar_url} alt={login} className='contrib-avatar' />
      <h3 className='contrib-login'>{login}</h3>
      <p className='contrib-type'>{type}</p>
      <span className='contrib-badge'>
        <GitCommit size={12} />
        {contributions} commits
      </span>
    </div>
    <div className='contrib-card-footer-bar'>
      <span>GitHub Profile</span>
      <span className='contrib-view-link'>View →</span>
    </div>
  </a>
);
