import { supabase } from './supabaseClient';

export async function getObjFileParts(id) {
  const { data, error } = await supabase
    .storage
    .from('korokoro_bucket')
    .list(id)
  if (error) {
    throw error;
  }
  const obj_file_parts = data.map(file => file.name);
  return obj_file_parts;
}

export async function downloadFile(id, filename) {
  const { data, error } = await supabase
    .storage
    .from('korokoro_bucket')
    .download(`${id}/${filename}`)
  if (error) {
    throw error;
  }
  return data.text();
}

export async function saveObj(id, blob) {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join('./public', `${id}`, 'mesh.obj');
  if (!fs.existsSync(`public/${id}`)) {
    fs.mkdirSync(`public/${id}`, { recursive: true });
  }
  try {
    fs.writeFileSync(filePath, await blob.text())
  } catch (error) {
    console.log(error)
  }
}