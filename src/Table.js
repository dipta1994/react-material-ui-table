import React from "react";
import TableHeader from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextField from '@mui/material/TextField'

import InlineForm from "./InlineForm";

const row = (
    x,
    i,
    header,
    handleRemove,
    startEditing,
    editIdx,
    handleSave,
    stopEditing
) => {
    const currentlyEditing = editIdx === i;
    return currentlyEditing ? (
        <TableRow key={`inline-form-${i}`} selectable="false">
            <InlineForm
                handleSave={handleSave}
                header={header}
                x={x}
                i={i}
                stopEditing={stopEditing}
            />
        </TableRow >
    ) : (
        <TableRow key={`tr-${i}`} selectable="false">
            {header.map((y, k) => (
                <TableCell key={`trc-${k}`}>{x[y.prop]}</TableCell>
            ))}
            <TableCell>
                <EditIcon onClick={() => startEditing(i)} />
                <DeleteIcon onClick={() => handleRemove(i)} />
            </TableCell>
        </TableRow>
    );
};

export default ({
    data,
    header,
    handleRemove,
    startEditing,
    editIdx,
    handleSave,
    stopEditing,
    handleSort,
    sortDirection,
    columnToSort
}) => (
    <Table>
        <TableHeader>
            <TableRow>
                {header.map((x, i) => (
                    <TableCell key={`thc-${i}`}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                            onClick={() => handleSort(x.prop)}
                        >
                            <span>{x.name}</span>
                            {columnToSort === x.prop ? (
                                sortDirection === "asc" ? (
                                    <ArrowDropUpIcon />
                                ) : (
                                    <ArrowDropDownIcon />
                                )
                            ) : null}
                        </div>
                    </TableCell>
                ))}
                <TableCell />
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((x, i) =>
                row(
                    x,
                    i,
                    header,
                    handleRemove,
                    startEditing,
                    editIdx,
                    handleSave,
                    stopEditing
                )
            )}
        </TableBody>
    </Table>
);
