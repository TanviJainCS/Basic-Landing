
type BannerProps = {
  banner_title: string;
  banner_description: string;
};

export const Banner = ({ banner_title, banner_description }: BannerProps) => (
  <section style={{ padding: '4rem 2rem'}}>
    <h1>{banner_title}</h1>
    <p>{banner_description}</p>
  </section>
);

   