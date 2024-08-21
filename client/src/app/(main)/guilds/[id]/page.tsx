export default function Guild({ params }: { params: { id: string } }) {
  return <div className="text-gray-300">This is a guild page {params.id}</div>;
}
