import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Search, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { HeaderTable } from '../components';

const Employees = () => {
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete', 'Add', 'Search'];
  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <HeaderTable category="Servicios" title="Empleados" />
      <GridComponent
        dataSource={customersData}
        enableHover={true}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter, Search]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
