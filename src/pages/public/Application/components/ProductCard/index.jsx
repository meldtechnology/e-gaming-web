import { Badge, Button } from "../../../../../ui-components/primitives";

export const ProductCard = ({
  permit,
  imageSrc,
  fallbackImageSrc,
  title,
  description,
  chips = [],
  feeLabel,
  featured = false,
  favorite = false,
  onFavorite,
  onApply,
  onViewDetails,
}) => {
  const resolvedImage = imageSrc || fallbackImageSrc;

  return (
    <article
      className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-e1 transition-all hover:-translate-y-1 hover:shadow-e2 ${
        featured ? "md:min-w-[320px]" : ""
      }`}
    >
      <div className="relative flex aspect-[4/3] items-center justify-center bg-surface-muted p-6">
        {resolvedImage ? (
          <img
            loading="lazy"
            src={resolvedImage}
            alt={title}
            className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-soft text-2xl font-bold text-brand"
          >
            {title?.charAt(0)}
          </div>
        )}
        {onFavorite ? (
          <button
            type="button"
            aria-label={favorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
            aria-pressed={favorite}
            onClick={onFavorite}
            className={`absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface shadow-e1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              favorite ? "text-danger" : "text-text-secondary hover:text-danger"
            }`}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill={favorite ? "currentColor" : "none"} aria-hidden="true">
              <path
                d="M20.8 4.6a5.4 5.4 0 00-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 00-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 000-7.6z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-base font-bold leading-6 text-text-primary">{title}</h3>
          {feeLabel ? <p className="shrink-0 text-sm font-bold text-brand">{feeLabel}</p> : null}
        </div>
        {description ? (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-text-secondary">{description}</p>
        ) : (
          <p className="mt-2 flex-1 text-sm leading-6 text-text-secondary">Application details are available during permit submission.</p>
        )}
        {chips.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Badge key={`${title}-${chip.label}`} tone={chip.tone || "brand"}>
                {chip.label}
              </Badge>
            ))}
          </div>
        ) : null}
        <div className="mt-5 grid grid-cols-2 gap-2">
          {onViewDetails ? (
            <Button variant="outline" color="neutral" buttonClicked={() => onViewDetails(permit)} fullWidth>
              View details
            </Button>
          ) : null}
          <Button className={onViewDetails ? "" : "col-span-2"} buttonClicked={() => onApply(permit)} fullWidth>
            Apply now
          </Button>
        </div>
      </div>
    </article>
  );
};
