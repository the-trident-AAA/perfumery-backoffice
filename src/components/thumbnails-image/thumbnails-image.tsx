"use client"
import Image from "next/image"
import React, { useState } from "react"

interface Props {
	altName: string
	images: string[]
}

export default function ThumbnailsImage({ images, altName }: Props) {
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	return (
		<div className="flex flex-col gap-4">
			{/* Imagen principal */}
			<div className="aspect-square w-full h-[52vh] rounded-xl overflow-hidden bg-gray-100">
				<Image
					src={images[selectedImageIndex] || "/placeholder.svg"}
					alt={altName}
					width={600}
					height={600}
					className="w-full h-full object-center"
				/>
			</div>

			{/* Thumbnails */}
			<div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => setSelectedImageIndex(index)}
						className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
							selectedImageIndex === index
								? "border-secondary ring-2 ring-primary"
								: "border-gray-200 hover:border-gray-300"
						}`}
					>
						<Image
							src={image || "/placeholder.svg"}
							alt={`${altName} vista ${index + 1}`}
							width={80}
							height={80}
							className="w-full h-full object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	)
}
