import { Entity } from 'src/shared/domain/entity';
import { Uuid } from 'src/shared/domain/value-objects/uuid.vo';

export class StubEntity extends Entity {
  entityId: Uuid;
  name: string;
  price: number;

  constructor(props: { entityId?: Uuid; name: string; price: number }) {
    super();

    this.entityId = props.entityId || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJson() {
    return {
      entityId: this.entityId.id,
      name: this.name,
      price: this.price,
    };
  }
}
