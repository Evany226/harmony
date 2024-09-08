export default function ChannelPage({
  params,
}: {
  params: { channelId: string };
}) {
  return <p>Channel Page {params.channelId} </p>;
}
