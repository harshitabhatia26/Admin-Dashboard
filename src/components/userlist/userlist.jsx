import React from "react";
import "./userlist.css";
import { useEffect, useState } from "react";
import {
  DataGrid,
} from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import SearchBar from "material-ui-search-bar";

export default function Userlist() {

  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [searched, setSearched] = useState("");
  const [selectionModel, setSelectionModel] = React.useState([]);

  const requestSearch = (searched) => {
    const filteredRows = records.filter((row) => {
      return row.name.toLowerCase().includes(searched.toLowerCase());
    });
    setUsers(filteredRows);
  };
  const cancelSearch = () => {
   setSearched('');
   requestSearch('');
  };

  useEffect(()=> {
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
    .then(response=>response.json())
    .then(json=>{setUsers(json) ; setRecords(json)})
  },[])
  console.log(users);
  console.log(records);

  const handleDelete = (id) => {
    setUsers(users.filter((item) => item.id !== id));
  };

  const deleteMultiple = (ids) => {
    let _users = [...users];
    ids.forEach(id => {
      _users = _users.filter((item) => item.id !== id)
    });
    setUsers(_users);
  }

  const columns = [
    { field: "id", headerName: "Id", width: 100, editable:false },
    { field: "name", headerName: "Name", width: 200, editable:true },
    { field: "email", headerName: "Email", width: 250, editable:true},
    { field: "role", headerName: "Role", width: 200,editable:true },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="userListDelete"
              onClick={()=> handleDelete(params.row.id)}
            />
          </>
        );
      }},
      {
        field: "delete",
        width: 100,
        sortable: false,
        disableColumnMenu: true,
        renderHeader: () => {
          return (
            <button onClick={()=>{
              const selectedIDs = new Set(selectionModel);
              deleteMultiple(selectedIDs);
            }}>Delete All</button>
          );
        }
      }

  ];

  return (
    <div className="userList">
        <SearchBar
    value={searched}
    onChange={(searchVal) => requestSearch(searchVal)}
    onCancelSearch={() => cancelSearch()}
  />
      <DataGrid rows={users} columns={columns} checkboxSelection onSelectionModelChange={(ids)=>{setSelectionModel(ids);}} pageSize={10} editMode="row" />
    </div>
  );
};

