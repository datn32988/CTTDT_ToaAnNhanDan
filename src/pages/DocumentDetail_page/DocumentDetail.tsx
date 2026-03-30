import CategoryDocument from "../../components/CategoryDocument";
import VerticalBanner from "../../components/VerticalBanner";
import ManagemanetDocLayout from "../../layouts/ManagementDoc";


function DocumentDetailPage(){
    return(
        <ManagemanetDocLayout>
            
                <div>
                    <div className="ml-[160px] ">
                        <CategoryDocument/>
                        <div className="w-[250px]">
                            <VerticalBanner/>
                        </div>
                        
                    </div>
                    
                </div>

        </ManagemanetDocLayout>

    );

    
}

export default DocumentDetailPage;