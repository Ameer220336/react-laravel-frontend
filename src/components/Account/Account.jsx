import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UserData } from './service/UserData';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function BasicDemo() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            acNr: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            acName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            acEmail: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        });
        setGlobalFilterValue('');
    };

    useEffect(() => {
        UserData.getUsers().then(data => {
            setUsers(data);
            setLoading(false);
        });
        initFilters();
    }, []);

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const verifiedBodyTemplate = (rowData) => {
        let admin = false;
        if(rowData.acAdmin == 1){
            admin = true;
        }
        return <i className={classNames('pi', { 'text-green-500 pi-user-plus': admin, 'text-red-500 pi-users': !admin })}></i>;
    };

    const header = renderHeader();
    return (
        <div className="card">
            <DataTable value={users} loading={loading} paginator rows={10} rowsPerPageOptions={[10, 25, 50]} showGridlines tableStyle={{ minWidth: '50rem' }} filters={filters} globalFilterFields={['acNr', 'acName', 'acEmail']} header={header} emptyMessage="No Users found.">
                <Column field="acNr" header="Account" filter filterPlaceholder="Account No. ?"></Column>
                <Column field="acName" header="Name" filter filterPlaceholder="Name?"></Column>
                <Column field="acEmail" header="Email" filter filterPlaceholder="Email?"></Column>
                <Column field="acAdmin" header="Admin" body={verifiedBodyTemplate} sortable></Column>
            </DataTable>
        </div>
    );
}
