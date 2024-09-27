import { format } from "date-fns";
import { ArticleComponent } from "../article-component";
import BackgroundComponent from "../background-component";
import { H1 } from "../ui/typography";

interface HeroProps {
  title: string;
  summary: string;
  publishedAt?: string | null;
}

const HeroNoImage: React.FC<HeroProps> = ({ title, summary, publishedAt }) => {
  return (
    <ArticleComponent>
      <BackgroundComponent />
      <div className="flex flex-col gap-4 text-center max-w-lg mx-auto">
        <H1>{title}</H1>
        <p className="text-muted-foreground">{summary}</p>
        <div className="text-muted-foreground">
          {format(Number(publishedAt), "LLL dd, yyyy")}
        </div>
      </div>
    </ArticleComponent>
  );
};

export default HeroNoImage;
