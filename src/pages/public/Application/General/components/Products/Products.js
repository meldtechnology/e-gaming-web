import { env } from "../../../../../../config/env";
import React, { useEffect, useMemo, useState } from "react";
import { GetPublicFileService as getFiles, removeAll, storeItem } from "../../../../../../services";
import { Link, useNavigate } from "react-router-dom";
import { EmptyState, Select } from "../../../../../../ui-components/primitives";
import { ProductCard } from "../../../components/ProductCard";

const mock = [
  { media: 'https://assets.maccarianagency.com/backgrounds/img37.png' },
  { media: 'https://assets.maccarianagency.com/backgrounds/img38.png' },
  { media: 'https://assets.maccarianagency.com/backgrounds/img39.png' },
  { media: 'https://assets.maccarianagency.com/backgrounds/img40.png' },
  { media: 'https://assets.maccarianagency.com/backgrounds/img41.png' },
  { media: 'https://assets.maccarianagency.com/backgrounds/img42.png' },
];

const FILES_URL = env.DOCUMENT_FILE_PUBLIC_URL;
const Products = () => {
  const [products, setProduct] = useState([]);
  const [showCount, setShowCount] = useState(6);
  const [sortBy, setSortBy] = useState("featured");
  const [favorites, setFavorites] = useState(() => new Set());
  const { documents } = getFiles(`${FILES_URL}?page=1&size=6`);
  const navigate = useNavigate();

  const selectPermit = (selectedPermit) => {
    storeItem('permit', JSON.stringify(selectedPermit));
    navigate('/apply/operator/verification');
  }

  useEffect(() => {
    if(documents !== null) setProduct(documents?.data?.results)
    removeAll();
  }, [documents]);

  const sortedProducts = useMemo(() => {
    const items = [...(products || [])];
    if (sortBy === "name") return items.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
    if (sortBy === "duration") return items.sort((a, b) => Number(a?.renewalDuration || 0) - Number(b?.renewalDuration || 0));
    if (sortBy === "fee") return items.sort((a, b) => Number(a?.value || 0) - Number(b?.value || 0));
    return items;
  }, [products, sortBy]);

  const visibleProducts = sortedProducts.slice(0, showCount);
  const featuredProducts = sortedProducts.slice(0, 3);

  const toggleFavorite = (item) => {
    const key = item?.publicId || item?.name;
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const productChips = (item) => [
    item?.renewalDuration ? { label: `${item.renewalDuration} days`, tone: "brand" } : null,
    item?.typeName ? { label: item.typeName, tone: "neutral" } : null,
    item?.categoryName ? { label: item.categoryName, tone: "neutral" } : null,
  ].filter(Boolean);

  const feeLabel = (item) => {
    if (item?.value === undefined || item?.value === null || item?.value === "") return "";
    return item?.feeType === "FLAT FEE" ? `NGN ${item.value}` : `${item.value}%`;
  };

  return (
    <div>
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-2xl">
          Featured gaming applications
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-text-secondary">
          Experience your license or permit application and approval as never before.
          Pay with ease by getting your invoice online.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to={`/apply/operator/Proprietor`}
            className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-strong"
          >
            View all for Proprietor
          </Link>
          <Link
            to={`/apply/operator/Agent`}
            className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-raised"
          >
            View all for Agent
          </Link>
        </div>
      </div>

      {featuredProducts.length ? (
        <section className="mb-10" aria-labelledby="featured-permits">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h3 id="featured-permits" className="text-xl font-bold text-text-primary">Featured</h3>
          </div>
          <div className="grid grid-cols-3 gap-6 overflow-x-auto pb-2 md:flex md:snap-x md:gap-4">
            {featuredProducts.map((item, i) => {
              const key = item?.publicId || item?.name || i;
              return (
                <ProductCard
                  key={key}
                  permit={item}
                  imageSrc={item?.logo}
                  fallbackImageSrc={mock[i % mock.length].media}
                  title={item?.name}
                  description={item?.description}
                  chips={productChips(item)}
                  feeLabel={feeLabel(item)}
                  featured
                  favorite={favorites.has(item?.publicId || item?.name)}
                  onFavorite={() => toggleFavorite(item)}
                  onApply={selectPermit}
                />
              );
            })}
          </div>
        </section>
      ) : null}

      <section aria-labelledby="more-permits">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 id="more-permits" className="text-xl font-bold text-text-primary">More permits</h3>
            <p className="mt-1 text-sm text-text-secondary">Browse available gaming permits and licenses.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Select
              label="Show"
              value={showCount}
              onChange={(event) => setShowCount(Number(event.target.value))}
              options={[
                { label: "6 permits", value: 6 },
                { label: "9 permits", value: 9 },
                { label: "12 permits", value: 12 },
              ]}
              wrapperClassName="w-36"
            />
            <Select
              label="Sort by"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              options={[
                { label: "Featured", value: "featured" },
                { label: "Name", value: "name" },
                { label: "Duration", value: "duration" },
                { label: "Fee", value: "fee" },
              ]}
              wrapperClassName="w-40"
            />
          </div>
        </div>

        {visibleProducts.length ? (
          <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
            {visibleProducts.map((item, i) => {
              const key = item?.publicId || item?.name || i;
              return (
                <ProductCard
                  key={key}
                  permit={item}
                  imageSrc={item?.logo}
                  fallbackImageSrc={mock[i % mock.length].media}
                  title={item?.name}
                  description={item?.description}
                  chips={productChips(item)}
                  feeLabel={feeLabel(item)}
                  favorite={favorites.has(item?.publicId || item?.name)}
                  onFavorite={() => toggleFavorite(item)}
                  onApply={selectPermit}
                />
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface p-8">
            <EmptyState title="No permits available" description="Available permits will appear here when published." />
          </div>
        )}
      </section>
    </div>
  );
};

export default Products;
