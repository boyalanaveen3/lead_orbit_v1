import AppLayout from "../../layouts/AppLayout";

export default function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <AppLayout>
      <section>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
    </AppLayout>
  );
}
