import { Badge } from "../ui/badge";

interface KeywordsListProps {
  keywords: string[];
}

const KeywordsList: React.FC<KeywordsListProps> = ({ keywords }) => {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  return (
    <ul>
      {keywords.map((keyword, index) => (
        <Badge className="inline-block mx-1" key={index}>
          {keyword}
        </Badge>
      ))}
    </ul>
  );
};

export default KeywordsList;
