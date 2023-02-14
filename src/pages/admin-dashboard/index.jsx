import SidebarAdmin from "../../navigation/sidebar";
import {Card} from "flowbite-react";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";

const data = {
    labels: [
        "unpaid",
        "paid",
        "refund",
    ],
    datasets: [
        {
            data: [30, 30, 300],
            backgroundColor: [
                "#008000",
                "#FFA500",
                "#0000FF"
            ],
            hoverBackgroundColor: [
                "#008000",
                "#FFA500",
                "#0000FF",
            ],
        },
    ],
};
const AdminDashboard = () =>{
    return (
        <section>
            <div className="flex text-red	 ...">
                <SidebarAdmin />{" "}
                <div class="grid overflow-hidden grid-cols-6 grid-rows-6 gap-2">
                    <div class="box row-start-1 row-end-1 col-start-1 col-end-1">
                        {" "}
                        <Card className="h-full color-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#33cc33"
                                className="w-6 h-6"
                            >
                                <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                                <path
                                    fillRule="evenodd"
                                    d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Total Revenue
                        </Card>
                    </div>
                    <div class="box row-start-1 row-end-1 col-start-2 col-end-2">
                        {" "}
                        <Card className="h-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#669999"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.624 7.084a.75.75 0 00-1.248.832l2.223 3.334H9a.75.75 0 000 1.5h2.25v1.5H9a.75.75 0 000 1.5h2.25v1.5a.75.75 0 001.5 0v-1.5H15a.75.75 0 000-1.5h-2.25v-1.5H15a.75.75 0 000-1.5h-1.599l2.223-3.334a.75.75 0 10-1.248-.832L12 10.648 9.624 7.084z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Total Not Paid
                        </Card>
                    </div>
                    <div class="box row-start-1 row-end-1 col-start-3 col-end-3">
                        {" "}
                        <Card className="h-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="#ff0000"
                                className="w-6 h-6"
                            >
                                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                                <path
                                    fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Total Refunded
                        </Card>
                    </div>
                    <div class="box row-start-2 row-end-6 col-start-1 col-end-4">
                        {" "}
                        <Card className="h-full">
                            <div>
                                <h2>Total Orders 2347 </h2>
                                <Doughnut data={data} width={400} height={400} />
                            </div>
                        </Card>
                    </div>
                    <div class="box row-start-1 row-end-6 col-start-4 col-end-7">
                        {" "}
                        <Card className="h-full">
                            <div>
                                <h2>Total Users 2347 </h2>
                                <Doughnut data={data} width={400} height={400} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default AdminDashboard;