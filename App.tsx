import React from "react";
import { Paper, SxProps, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridRowProps,
} from "@mui/x-data-grid"; // this "mui/x-data-grid" is the free version of the material Ui and datagrid is the largest component of the material UI
import { faker } from "@faker-js/faker";
import { saveAs } from "file-saver";
// faker js for fake data
const columns: GridColDef[] = [
  {
    field: "address",
    headerName: "Street/Apartment Address",
    flex: 2,
    sortable: false,
    filterable: false,
    disableExport: true,
    // rendering editing
    editable: true
  },
  // sortable is the prop to disable the sort filter in the column menu of the header in the address menu
  {
    field: "zip",
    headerName: "Zip Code",
    flex: 1,
    editable: true
  },
  {
    field: "city",
    headerName: "city",
    flex: 1,
    editable: true
  },
  {
    field: "state",
    headerName: "state",
    flex: 1,
    editable: true
  },
];
// const addresses : GridRowsProps = [];
const addresses: {
  [key: string]: any;
}[] = [];
for (let i = 0; i < 200; i++) {
  addresses.push({
    id: i + 1,
    address: `${faker.address.streetAddress()} ${faker.address.secondaryAddress()}`,
    zip: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
  });
}

const datagridSx: SxProps = {
  marginleft: "auto",
  marginright: "auto",
  margintop: 100,
  borderRadius: 2,
  height: 600,
  width: 800,
};
// Custom toolbar to add the export button

// Function to convert data to CSV and trigger download
// Function to convert data to CSV and trigger download
const exportToCSV = (rows: any[], columns: any[]) => {
  const header = columns.map((col) => col.headerName).join(",") + "\n";
  const rowsData = rows
    .map((row) => {
      return columns
        .map((col) => {
          return row[col.field];
        })
        .join(",");
    })
    .join("\n");

  const csv = header + rowsData;

  // Trigger download of the CSV file
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "data.csv");
};
// Function to trigger the print functionality
const printDataGrid = (rows: any[], columns: any[]) => {
  let printWindow = window.open('', '', 'height=800,width=800');
  let printContent = '<html><head><title>DataGrid Print</title></head><body>';
  printContent += '<h1>DataGrid Print</h1>';
  printContent += '<table border="1" cellspacing="0" cellpadding="5">';
  
  // Table headers
  printContent += '<thead><tr>';
  columns.forEach(col => {
    printContent += `<th>${col.headerName}</th>`;
  });
  printContent += '</tr></thead>';

  // Table rows
  printContent += '<tbody>';
  rows.forEach(row => {
    printContent += '<tr>';
    columns.forEach(col => {
      printContent += `<td>${row[col.field]}</td>`;
    });
    printContent += '</tr>';
  });
  printContent += '</tbody>';

  printContent += '</table>';
  printContent += '</body></html>';

  printWindow?.document.write(printContent);
  printWindow?.document.close();
  printWindow?.print();
};
export default function App() {
  const [pageSize,setPageSize]= React.useState(20);
  return (
    <Paper sx={datagridSx}>
      <Button
        onClick={() => exportToCSV(addresses, columns)}
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
      >
        Download and Export to Csv
      </Button>
      <Button
        onClick={() => printDataGrid(addresses, columns)}
        variant="contained"
        color="secondary"
        sx={{ marginBottom: 2, marginLeft: 2 }}
      >
        Print DataGrid
      </Button>
      <DataGrid
        rows={addresses}
        columns={columns}
        pagination={true}
        // pageSize={pageSize}
        // onPageSizeChange={(newPageSize)=>{setPageSize(new)}}
        // autoPageSize={true}
        // we cannot turn pagination off in typescript so we can change the pagesize with no of column in a page 
        initialState={{
          sorting: { sortModel: [{ field: "state", sort: "asc" }]},
          // filter : {
          //   filterModel:{
          //     items :[
          //       {
          //         columnField :'zip',
          //         operatorValue:'=',
          //         value:'78701'}
          //     ]
          //   }
          // }
        }}
      />
    </Paper>
  );
}
