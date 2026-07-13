import { Tag as LegacyTag } from "../Tag";

export type TagProps = {
  selectedTags: (tags: string[]) => void;
  placeholder?: string;
  tags?: string[];
  [key: string]: unknown;
};

export const Tag = ({ placeholder = "", tags = [], ...props }: TagProps) => (
  <LegacyTag placeholder={placeholder} tags={tags} {...props} />
);
