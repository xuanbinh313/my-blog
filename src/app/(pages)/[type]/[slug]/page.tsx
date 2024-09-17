import { useParams } from "next/navigation";
import React from "react";

const CMSDetailPage = () => {
  const params = useParams<{ type: string; slug: string }>();
  return <div>CMSDetailPage {params.slug} - {params.type}</div>;
};

export default CMSDetailPage;
