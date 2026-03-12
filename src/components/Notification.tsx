import { IoNotificationsCircleOutline } from "react-icons/io5";

interface NotificationProps {
    id: string;
    title: string;
    date: Date;
}

    


function Notification() { 
    const notifications: NotificationProps[] = [
        { id: "1", title: "Thông báo về việc tổ chức phiên họp thứ 10 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2024-01-15") },
        { id: "2", title: "Thông báo về việc tổ chức phiên họp thứ 9 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-12-20") },
        { id: "3", title: "Thông báo về việc tổ chức phiên họp thứ 8 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-11-10") },
        { id: "4", title: "Thông báo về việc tổ chức phiên họp thứ 7 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-10-05") },
        { id: "5", title: "Thông báo về việc tổ chức phiên họp thứ 6 của Hội đồng Thẩm phán Tòa án nhân dân tối cao", date: new Date("2023-09-15") }
    ];  
    const doubledNotifications = [...notifications, ...notifications];

    return (
        <div className="bg-gray-100  ml-[160px] mr-[127px]  gap-10">
            <div className="bg-red-500 flex h-9">
                <p >
                   <IoNotificationsCircleOutline className="text-white text-3xl inline-block mx-2 " /> 
                </p>

                 <div className="relative flex-1 h-full overflow-hidden bg-slate-50 pl-4">
                    <div className="flex flex-col animate-slide-up ">
                        {doubledNotifications.map((item, index) => (
                            <div 
                                key={index} 
                                className="h-10 flex items-center text-sm space-x-1 whitespace-nowrap "
                            >
                                <span className="text-black text-xl">{item.title}</span>
                                <span className="text-red-400 font-bold">({item.date.toLocaleDateString()})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>  
            <div className="">


            </div>    
        </div>
    );
  }

export default Notification