import BlogPage from "./components/blog-page";

interface BlogPageProps {
  slug: string;
  // Add other props specific to BlogPage if any
}

const type: { [key: string]: React.FC<BlogPageProps> } = {
  blog: BlogPage as React.FC<BlogPageProps>,
};

interface BlockProps {
  type: string;
  slug: string;
}

const BlockItem: React.FC<BlockProps> = (props) => {
  const Component = type[props.type];
  if (!Component) return null;
  return <Component slug={props.slug} />;
};

const CMSDetailPage: React.FC<{
  params: { type: string; slug: string };
}> = ({ params }) => {
  return (
    <main className="flex flex-col gap-7">
      <BlockItem type={params.type} slug={params.slug} />
    </main>
  );
};

export default CMSDetailPage;
