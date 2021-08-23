import GroupInfo from "./GroupInfo"
import "./Body.css"

const dummyData = [
    {
        groupName:"group1",
        createdBy:"admin1",
        accesskey:"test",
        date:"dummy1"
    },
    {
        groupName:"group2",
        createdBy:"admin2",
        accesskey:"test",
        date:"dummy2"
    },
    {
        groupName:"group3",
        createdBy:"admin3",
        accesskey:"test",
        date:"dummy3"
    },
    {
        groupName:"group4",
        createdBy:"admin4",
        accesskey:"test",
        date:"dummy4"
    },
    {
        groupName:"group5",
        createdBy:"admin5",
        accesskey:"test",
        date:"dummy5"
    },
]

const Body = () => {

    return (
        <div className="Body">
            {dummyData.map((data) => <GroupInfo data={data}></GroupInfo>)}
        </div>
    );
}

export default Body;