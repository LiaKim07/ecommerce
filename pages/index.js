// Import Custom Component
import NewsletterModal from "../components/features/modals/newsletter-modal";
import HomeSection from "../components/partials/home/home-section";
import BannerSection from "../components/partials/home/banner-section";
import BrandSection from "../components/partials/home/brand-section";
import FeaturedCollection from "../components/partials/home/featured-collection";
import ProductWidgetContainer from "../components/partials/home/product-widget-container";
import abslouteUrl from "next-absolute-url";
import qs from "qs";

function Home({ data, loading }) {
  //   const { restData, loading } = useFetch("/products?demo=12");
  //   const { data, loading, error } = useQuery(GET_HOME_DATA, {
  //     variables: { productsCount: 5 },
  //   });
  const featured = data && data.specialProducts.featured;
  const bestSelling = data && data.specialProducts.bestSelling;
  const latest = data && data.specialProducts.latest;
  const topRated = data && data.specialProducts.topRated;
  const onSale = data && data.specialProducts.onSale;
  const product = data && data.products.data;

  //   if (error) {
  //     return <div>{error.message}</div>;
  //   }

  return (
    <>
      <main
        className={`home skeleton-body skel-shop-products ${
          loading ? "" : "loaded"
        }`}
      >
        <HomeSection />

        <BannerSection />

        <BrandSection />

        <FeaturedCollection product={product} loading={loading} />

        <FeaturedCollection product={onSale} loading={loading} sale={true} />

        <ProductWidgetContainer
          featured={featured}
          latest={latest}
          bestSelling={bestSelling}
          topRated={topRated}
          loading={loading}
        />
      </main>

      <NewsletterModal />
    </>
  );
}

export default Home;
export async function getServerSideProps(ctx) {
  const { origin } = abslouteUrl(ctx.req);
  const params = qs.stringify({
    demo: 12,
    limit: 5,
    featured: true,
    onSale: true,
    bestSelling: true,
    topRated: true,
    latest: true,
  });
  const products = await fetch(`${origin}/api/products?${params}`);
  const data = await products.json();
  return {
    props: {
      data: data,
      loading: products.status === 200 ? false : true,
    },
  };
}
