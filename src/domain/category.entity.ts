export type CategoryConstructorProps = {
	categoryId?: string;
	name: string;
	description?: string | null;
	isActive?: boolean;
	createdAt?: Date;
};

export type CategoryCreateCommand = {
	name: string;
	description?: string | null;
	isActive?: boolean;
}

export class Category {
	categoryId: string;
	name: string;
	description?: string | null;
	isActive?: boolean;
	createdAt?: Date;

	//used by db rehydration
	constructor(props: CategoryConstructorProps) {
		this.categoryId = props.categoryId;
		this.name = props.name;
		this.description = props.description ?? null;
		this.isActive = props.isActive ?? true;
		this.createdAt = props.createdAt ?? new Date();
	}

	//factory method
	static create(props: CategoryCreateCommand): Category {
		const category = new Category(props);
		return category;
	}

	changeName(name: string): void {
		this.name = name;
	}

	changeDescription(description: string): void {
		this.description = description;
	}

	activate(): void {
		this.isActive = true;
	}

	deactivate(): void {
		this.isActive = false;
	}

	toJson() {
		return {
			categoryId: this.categoryId,
			name: this.name,
			description: this.description,
			isActive: this.isActive,
			createdAt: this.createdAt
		}
	}
}