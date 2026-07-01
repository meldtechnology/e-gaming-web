import { Loader as LegacyLoader } from "../Loader";

export type LoaderProps = {
  w?: string;
  h?: string;
};

export const Loader = ({ w = "w-8", h = "h-8" }: LoaderProps) => <LegacyLoader w={w} h={h} />;
