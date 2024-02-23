function Page({
  className = "",
  heading,
  subHeading,
  children,
  icon,
}: {
  className?: string;
  heading: string;
  subHeading?: JSX.Element | undefined;
  children: JSX.Element;
  icon?: string;
}) {
  return (
    <section className={`page ${className}`}>
      <div className="content">
        <header>
          <div>
            {icon && (
              <img className="icon" src={icon} alt={heading + "project"} />
            )}
            <h1 className="heading">{heading}</h1>
          </div>
          {subHeading}
        </header>
        {children}
      </div>
    </section>
  );
}
export default Page;
