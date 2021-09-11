import React from "react";

import { useParams } from "react-router";

import "./GroupDetail.css";

const GroupDetail = () => {
    const param = useParams();

    return <div>GroupDetail:{param["id"]}
    </div>
}

export default GroupDetail;