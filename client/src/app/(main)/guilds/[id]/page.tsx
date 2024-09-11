export default async function GuildPage({
  params,
}: {
  params: { id: string };
}) {
  return <p>NO CHANNELS for {params.id}</p>;
}
