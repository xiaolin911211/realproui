import { Table, Pagination } from "flowbite-react";
import AdminSideBar from "../../components/sidebar/AdminSideBar";
import useSWRImmutable from "swr";
import { HttpGetStatus } from "../../components/api/RequestAPI";
import {
  GET_STATUS_URL,
  TABLE_NUM_PAGE,
} from "../../components/constant/Constants";
import Loading from "../../components/loading/index";
import { useState, useEffect } from "react";
const AdminStatusPage = () => {
  const { data, error } = useSWRImmutable(GET_STATUS_URL, HttpGetStatus, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [displayStatus, setDisplayStatus] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [arrayList, setArrayList] = useState(0);

  useEffect(() => {
    const startIndex = 0 * TABLE_NUM_PAGE;
    const endIndex = startIndex + TABLE_NUM_PAGE;
    if (data?.data != undefined) {
      console.log(data?.data);
      setDisplayStatus(data?.data.slice(startIndex, endIndex));
      setArrayList(Math.ceil(data?.data.length / TABLE_NUM_PAGE));
    }
  }, [data]);

  const onPageChange = (e) => {
    setPage(e);
    const startIndex = (e - 1) * TABLE_NUM_PAGE;
    const endIndex = startIndex + TABLE_NUM_PAGE;
    setDisplayStatus(data?.data.slice(startIndex, endIndex));
  };

  return (
    <section>
      <div className="flex ...">
        <AdminSideBar />
        <Loading loading={loading} />
        <div className="flex-auto w-64 ...">
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <Table hoverable={true}>
              <Table.Head>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Status Description</Table.HeadCell>
                <Table.HeadCell>Status </Table.HeadCell>
                <Table.HeadCell>Status Code</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {displayStatus.map((row) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{row.type}</Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {row.description}
                    </Table.Cell>
                    <Table.Cell>
                      {" "}
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                        {row.active ? "Active" : "Not Active"}
                      </div>
                    </Table.Cell>
                    <Table.Cell>{row.statusId}</Table.Cell>
                    <Table.Cell>
                      <a
                        href="/tables"
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </a>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <div className="flex flex-col items-center">
              <span className="text-xl text-gray-700 dark:text-gray-400">
                Page {page}
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <Pagination
                  page={page}
                  currentPage={page}
                  onPageChange={onPageChange}
                  showIcons={true}
                  totalPages={arrayList}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AdminStatusPage;
