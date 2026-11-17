package com.oneword.forest;
import android.content.*;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.net.Uri;
import android.os.ParcelFileDescriptor;
import android.provider.OpenableColumns;
import java.io.*;
/** Exactly one private-cache file, read grants only; never a general file browser. */
public class BetaUpdateProvider extends ContentProvider {
 public boolean onCreate(){return true;}
 private File checked(Uri u)throws FileNotFoundException{if(!"/beta-update.apk".equals(u.getPath())||u.getQuery()!=null||u.getFragment()!=null)throw new FileNotFoundException();File f=new File(getContext().getCacheDir(),"beta-update.apk");if(!f.isFile())throw new FileNotFoundException();return f;}
 public String getType(Uri u){return "application/vnd.android.package-archive";}
 public ParcelFileDescriptor openFile(Uri u,String mode)throws FileNotFoundException{if(!"r".equals(mode))throw new FileNotFoundException();return ParcelFileDescriptor.open(checked(u),ParcelFileDescriptor.MODE_READ_ONLY);}
 public Cursor query(Uri u,String[] projection,String selection,String[] args,String order){try{File f=checked(u);String[] cols=projection==null?new String[]{OpenableColumns.DISPLAY_NAME,OpenableColumns.SIZE}:projection;MatrixCursor c=new MatrixCursor(cols);Object[] row=new Object[cols.length];for(int i=0;i<cols.length;i++)row[i]=OpenableColumns.DISPLAY_NAME.equals(cols[i])?"one-world-beta-update.apk":OpenableColumns.SIZE.equals(cols[i])?f.length():null;c.addRow(row);return c;}catch(Exception e){return null;}}
 public Uri insert(Uri u,ContentValues v){throw new UnsupportedOperationException();}public int delete(Uri u,String s,String[] a){throw new UnsupportedOperationException();}public int update(Uri u,ContentValues v,String s,String[] a){throw new UnsupportedOperationException();}
}
