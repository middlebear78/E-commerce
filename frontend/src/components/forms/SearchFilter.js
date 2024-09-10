import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function SearchFilter({ keyWord, setKeyword }) {
  return (
    <div className="container pt-4 pb-4">
      <Input
        placeholder="Search Filter"
        value={keyWord}
        onChange={(e) => setKeyword(e.target.value.toLowerCase())}
        addonAfter={<SearchOutlined />}
      />
    </div>
  );
}

export default SearchFilter;
