import React from "react";
import { H1 } from "../ui/typography";
import { Card } from "../ui/card";
import BackgroundComponent from "../background-component";
import { ArticleComponent } from "../article-component";

const HeroNoImage = () => {
  return (
    <ArticleComponent>
      <BackgroundComponent />
      <div className="flex flex-col gap-4 text-center max-w-lg mx-auto">
        <H1>Starting and Growing a Career in Web Design</H1>
        <p className="text-muted-foreground">
          From honing your skills and building your portfolio to finding clients
          and establishing yourself in the industry.
        </p>
        <div className="text-muted-foreground">Apr 8, 2022</div>
      </div>
    </ArticleComponent>
  );
};

export default HeroNoImage;
