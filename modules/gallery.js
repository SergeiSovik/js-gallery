/*
 * Copyright 2000-2020 Sergio Rando <segio.rando@yahoo.com>
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

import { HTMLTexture } from "./../../../include/texture.js"
import { TextureImage, TextureSurface } from "./texture.js"

/** @typedef {Object<string, TextureImage|TextureSurface>} TextureList */ var TextureList;

export class Galery {
	/** @param {HTMLElement} domContainer */
	constructor(domContainer) {
		this.domContainer = domContainer;
		/** @type {TextureList} */ this.dictList = {};
	}

	/** @param {HTMLTexture} domTexture */
	register(domTexture) {
		this.domContainer.appendChild(domTexture);
	}

	/** @param {HTMLTexture} domTexture */
	unregister(domTexture) {
		if (this.domContainer.contains(domTexture))
			this.domContainer.removeChild(domTexture);
	}

	/**
		* @param {string} sKey
		* @returns {TextureImage | TextureSurface | null}
		*/
	get(sKey) {
		return this.dictList[sKey] || null;
	}
	
	/** @param {string} sKey */
	remove(sKey) {
		if (this.dictList[sKey] !== undefined)
			this.dictList[sKey].release();
	}

	/**
		* @param {string} sKey 
		* @param {HTMLImageElement} domImage 
		* @returns {TextureImage}
		*/
	createTextureImage(sKey, domImage) {
		let oTexture = new TextureImage(sKey, this, domImage);

		if (sKey !== null) {
			if (this.dictList[sKey] !== undefined)
				this.dictList[sKey].release();

			this.dictList[sKey] = oTexture;
		}

		return oTexture;
	}

	/**
		* @param {string | null} sKey 
		* @param {number} uWidth 
		* @param {number} uHeight
		* @returns {TextureSurface}
		*/
	createTextureSurface(sKey, uWidth, uHeight) {
		let domCanvas = /** @type {HTMLCanvasElement} */ ( document.createElement("canvas") );
		domCanvas.width = uWidth;
		domCanvas.height = uHeight;

		this.register(domCanvas);

		let oTexture = new TextureSurface(sKey, this, domCanvas);

		if (sKey !== null) {
			if (this.dictList[sKey] !== undefined)
				this.dictList[sKey].release();

			this.dictList[sKey] = oTexture;
		}

		return oTexture;
	}

	release() {
		for (var sKey in this.dictList)
			this.dictList[sKey].release();

		this.dictList = {};
	}
}
