export const GenerateJSONFile = (data, sitename) => {
  // const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([data], { type: 'application/zip' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'site_export.zip';
  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
};
