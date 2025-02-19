"use client";
import ButtonGroup from "@/components/button-group";
import React from "react";

function ActionsHandler({ id }) {
  const deleteHandler = () => {};
  const updateHandler = () => {
    console.log("Updated", id);
  };
  return (
    <ButtonGroup
      updateTitle={"Updated"}
      deleteTitle={"Delete"}
      updateHandler={updateHandler}
      deleteHandler={deleteHandler}
    />
  );
}

export default ActionsHandler;
