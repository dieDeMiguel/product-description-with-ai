import { Badge } from "../ui/badge";

interface TagsListProps {
  tags: string[];
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge
          className="bg-badgeBackground inline-block text-black hover:text-white"
          key={index}
        >
          {tag}
        </Badge>
      ))}
    </ul>
  );
};

export default TagsList;
