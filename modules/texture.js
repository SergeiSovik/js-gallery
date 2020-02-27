/*
 * Copyright 2000-2020 Sergei Sovik <sergeisovik@yahoo.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *		http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

import { GalleryImpl } from "./../globals/gallery.js"
import { HTMLTexture, TextureImpl } from "./../../../include/texture.js"

/** @abstract */
export class Texture extends TextureImpl {
	/**
		* @param {string | null} sKey 
		* @param {GalleryImpl | null} oGalery 
		* @param {HTMLTexture | null} domElement 
		*/
	constructor(sKey, oGalery, domElement) {
		super(sKey, domElement);
		this.oGalery = oGalery;
	}

	/** @abstract */
	release() {}
}

export class TextureSurface extends Texture {
	/**
		* @param {string | null} sKey 
		* @param {GalleryImpl | null} oGalery 
		* @param {HTMLCanvasElement} domCanvas 
		*/
	constructor(sKey, oGalery, domCanvas) {
		super(sKey, oGalery, null);
		/** @type {HTMLCanvasElement} */ this.domElement = domCanvas;
		this.oContext = domCanvas.getContext("2d");
		this.oContext.imageSmoothingEnabled = false;
	}

	release() {
		if (this.oGalery !== null) {
			if (this.sKey !== null) {
				delete(this.oGalery.dictList[this.sKey]);
			}
			this.oGalery.unregister(this.domElement);
			this.oGalery = null;
		}
		this.domElement = null;
		this.oContext = null;
	}
}

export class TextureImage extends Texture {
	/**
		* @param {string | null} sKey 
		* @param {GalleryImpl | null} oGalery 
		* @param {HTMLImageElement} domImage 
		*/
	constructor(sKey, oGalery, domImage) {
		super(sKey, oGalery, null);
		/** @type {HTMLImageElement} */ this.domElement = domImage;
	}

	release() {
		if (this.oGalery !== null) {
			if (this.sKey !== null) {
				delete(this.oGalery.dictList[this.sKey]);
			}
			this.oGalery.unregister(this.domElement);
			this.oGalery = null;
		}
		this.domElement = null;
	}
}
