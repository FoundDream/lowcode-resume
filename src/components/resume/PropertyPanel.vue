const handleStyleChange = (property: keyof ComponentStyle, value: string | undefined) => {
  const newStyle = { ...props.style };
  if (value === undefined) {
    delete newStyle[property];
  } else {
    newStyle[property] = value;
  }
  emit('styleUpdate', newStyle);
}; 