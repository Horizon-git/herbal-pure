import './PageNotFoundPage.scss';

export const PageNotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1>404 - Page Not Found</h1>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
    </div>
  );
};
