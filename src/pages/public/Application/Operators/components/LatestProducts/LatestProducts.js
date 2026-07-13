import { env } from "../../../../../../config/env";
import React, { useEffect, useMemo, useState } from "react";
import { GetPublicFileService as getFiles, removeAll, storeItem } from "../../../../../../services";
import { useNavigate } from "react-router-dom";
import { EmptyState, Select } from "../../../../../../ui-components/primitives";
import { ProductCard } from "../../../components/ProductCard";

const mock = [
  { media: 'https://assets.maccarianagency.com/backgrounds/img38.png' },
  { media: 'https://assets.maccarianagency.com/backgrounds/img39.png' },
  { media: 'https://assets.maccarianagency.com/backgrounds/img40.png' },
  { media: 'https://assets.maccarianagency.com/backgrounds/img41.png' },
];

const FILTER_FILES_URL = env.DOCUMENT_FILTER_FILE_PUBLIC_URL;
const LatestProducts = ({operatorType}) => {
  const [products, setProduct] = useState([]);
  const [page, ] = useState(1);
  const [showCount, setShowCount] = useState(12);
  const [sortBy, setSortBy] = useState("featured");
  const [favorites, setFavorites] = useState(() => new Set());
  const navigate = useNavigate();
  const { documents } = getFiles(`${FILTER_FILES_URL}?page=${page}&size=500&categoryFilter=${operatorType}`);

  const selectPermit = (selectedPermit) => {
    storeItem('permit', JSON.stringify(selectedPermit));
    navigate('/apply/operator/verification');
  }

  useEffect(() => {
    if(documents !== null) setProduct(documents?.data?.results);
    removeAll();
  }, [documents]);

  const visiblePublicProducts = useMemo(() => (products || []).filter((item) => item?.publicVisibility === true), [products]);

  const sortedProducts = useMemo(() => {
    const items = [...visiblePublicProducts];
    if (sortBy === "name") return items.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
    if (sortBy === "duration") return items.sort((a, b) => Number(a?.renewalDuration || 0) - Number(b?.renewalDuration || 0));
    if (sortBy === "fee") return items.sort((a, b) => Number(a?.value || 0) - Number(b?.value || 0));
    return items;
  }, [visiblePublicProducts, sortBy]);

  const visibleProducts = sortedProducts.slice(0, showCount);

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
    operatorType ? { label: operatorType, tone: "neutral" } : null,
  ].filter(Boolean);

  const feeLabel = (item) => {
    if (item?.value === undefined || item?.value === null || item?.value === "") return "";
    return item?.feeType === "FLAT FEE" ? `NGN ${item.value}` : `${item.value}%`;
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-2xl">
            The {operatorType} application types
          </h2>
          <p className="mt-3 max-w-2xl text-base text-text-secondary">
            Pick your desired {operatorType} permit/license type from the available list.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Select
            label="Show"
            value={showCount}
            onChange={(event) => setShowCount(Number(event.target.value))}
            options={[
              { label: "8 permits", value: 8 },
              { label: "12 permits", value: 12 },
              { label: "24 permits", value: 24 },
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
        <div className="grid grid-cols-4 gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {visibleProducts.map((item, i) => (
            <ProductCard
              key={item?.publicId || item?.name || i}
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
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-8">
          <EmptyState title="No visible permits available" description="Published permits for this operator type will appear here." />
        </div>
      )}
    </div>
  );
};

export default LatestProducts;
