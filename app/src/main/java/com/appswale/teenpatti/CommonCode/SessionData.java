package com.appswale.teenpatti.CommonCode;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.util.Log;

public class SessionData {

	/** Shared Preference Name */
	private String SESSION_NAME = "TEENPATTI";
	/** Context of activity */
	private Context context;
	/** Shared Preference Editor */
	private Editor editor;
	/** Shared Preference variable */
	private SharedPreferences preferences;
	
	public SessionData(Context _context) {
		this.context = _context;
		preferences = context.getSharedPreferences(SESSION_NAME, Context.MODE_PRIVATE);
		editor = preferences.edit();
	}
	
	/**
	 * This is used to set object as string into session
	 * @param key
	 * @param value
	 */
	public void setObjectAsString(String key, String value) {
		Log.i(key, value);
		editor.putString(key, value);
		editor.commit();
	}
	
	/**
	 * This is used to get object string from session
	 * @param key
	 * @return
	 */
	public String getObjectAsString(String key) {
		return preferences.getString(key, null);
	}
	
	/**
	 * This is used to delete object from session
	 * @author Admin
	 * @param key
	 */
	public void removeObject(String key) {
		editor.remove(key);
		editor.commit();
	}
	
	/**
	 * This is used to check whether object present or not
	 * @author Admin
	 * @param objectKey
	 * @return
	 */
	public boolean isPresent(String objectKey) {
		return preferences.contains(objectKey);
	}
	
	/**
	 * This is used to make user logout
	 * @author Admin
	 */
	public void logout() {
		editor.clear();
		editor.commit();
	}
	public void setObjectAsInteger(String key, int value) {
		Log.i(key, String.valueOf(value));
		editor.putInt(key, value);
		editor.commit();
	}
	
	
	public int getObjectAsInteger(String key) {
		return preferences.getInt(key,0);
	}
}
