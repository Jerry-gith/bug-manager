import Pagination from "@/components/Pagination";

export default function Home() {
  return (
    <div>
      Welcome to Bug Manager
      <Pagination itemCount={100} pageSize={10} currentPage={1} />
    </div>
  );
}
