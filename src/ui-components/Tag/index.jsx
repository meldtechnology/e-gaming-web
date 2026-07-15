import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Downshift from "downshift";

export const Tag = ({ selectedTags, placeholder, tags, ...other }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(() =>
    Array.isArray(tags) ? tags : []
  );

  // Keep the latest parent callback in a ref so notifying the parent never
  // depends on `selectedTags` identity. Depending on an inline (non-memoized)
  // callback here previously caused an infinite render loop.
  const selectedTagsRef = useRef(selectedTags);
  useEffect(() => {
    selectedTagsRef.current = selectedTags;
  }, [selectedTags]);

  // Sync from the `tags` prop by content, not by array reference. A default
  // `[]` param (or an unmemoized array from the parent) is a fresh reference
  // every render, which would otherwise re-run this effect forever.
  const tagsKey = Array.isArray(tags) ? JSON.stringify(tags) : "";
  useEffect(() => {
    setSelectedItem(Array.isArray(tags) ? tags : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagsKey]);

  // Update local state and notify the parent in one place, driven only by
  // real user actions (add/remove) rather than by an effect.
  const commit = next => {
    setSelectedItem(next);
    selectedTagsRef.current?.(next);
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const duplicatedValues = selectedItem.indexOf(event.target.value.trim());

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;

      commit([...selectedItem, event.target.value.trim()]);
      setInputValue("");
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      commit(selectedItem.slice(0, selectedItem.length - 1));
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    commit(newSelectedItem);
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    commit(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder
          });
          return (
            <div>
              <TextField
                InputProps={{
                  startAdornment: selectedItem.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      sx={{ m: "4px 2px" }}
                      onDelete={handleDelete(item)}
                    />
                  )),
                  onBlur,
                  onChange: event => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus
                }}
                {...other}
                {...inputProps}
              />
            </div>
          );
        }}
      </Downshift>
    </>
  )
}
Tag.propTypes = {
  selectedTags: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.string)
};
