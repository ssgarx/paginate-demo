import useSWRInfinite from "swr/infinite"
import Pagination from "../components/pagination"

const fetcher = (url) => fetch(url).then((res) => res.json());

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null
  return `https://api.punkapi.com/v2/beers?page=${pageIndex + 1}&per_page=10`
}

export default function Index() {
  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher, {
    initialSize: 1,
    revalidateFirstPage: false,
  })

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  // Get data of the current page only
  const currentPageData = data[size - 1]

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-5xl space-y-8">
        <ul className="border-b">
          {currentPageData?.map((beer) => (
            <li key={beer.id}>{beer.name}</li>
          ))}
        </ul>
        <Pagination
          pageSize={10}
          totalCount={100}
          currentPageIndex={size - 1}
          showFooterText={true}
          onChangePage={(page) => setSize(page + 1)}
        />
      </div>
    </div>
  )
}
