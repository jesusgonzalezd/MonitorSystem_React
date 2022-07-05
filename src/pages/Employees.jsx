import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Selection, Inject, Edit, Toolbar, Sort, Filter, ExcelExport, PdfExport } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { HeaderTable } from '../components';

const Employees = () => {
  
  let gridInstance;
  
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete', 'Add', 'Search', 'PdfExport'];
  const editing = { allowDeleting: true, allowEditing: true };

  const toolbarClick = (args) => {
    switch (args.item.text) {
      case 'PDF Export':
        gridInstance.pdfExport();
        break;
    }
  }

  
  return (
    
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <HeaderTable category="Servicios" title="Empleados" />
      <GridComponent 
       ref={grid => gridInstance = grid}
        
        dataSource={customersData}
        enableHover={true}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        allowExcelExport
        allowPdfExport = {true}
        toolbarClick={toolbarClick.bind(this)}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter, Search, ExcelExport, PdfExport]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
