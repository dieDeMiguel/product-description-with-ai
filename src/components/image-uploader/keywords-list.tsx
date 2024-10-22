import { Badge } from "../ui/badge";

interface KeywordsListProps {
  keywords: string[];
}

const KeywordsList: React.FC<KeywordsListProps> = ({ keywords }) => {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <Badge
          className="bg-badgeBackground inline-block text-black hover:text-white"
          key={index}
        >
          {keyword}
        </Badge>
      ))}
    </ul>
  );
};

export default KeywordsList;
