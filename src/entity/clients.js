module.exports = (nga, admin) => {
  const contact = nga.entity('clients');

  const fields = [
    nga.field('firstName')
      .label('First Name')
      .validation({
        required: true,
      }),
    nga.field('lastName')
      .label('Last Name'),
  ];

  contact
    .listView()
    .fields([
      nga.field('fullName')
        .isDetailLink(true)
        .label('Full Name'),
      ...fields,
    ])
    .filters(fields);

  contact.creationView().fields(fields);

  contact
    .editionView()
    .title('Edit: {{ entry.values.fullName }}')
    .fields([
    ...fields,
    nga.field('description', 'text'),
    nga.field('')
      .label('Graph')
      .template('<graph clientid="{{ entry.values.id }}"/>'),
    nga.field('').label('')
      .template('<ma-create-button entity-name="nodes" size="sm" label="Create node" default-values="{ clientId: entry.values.id }"></ma-create-button>'),
    nga.field('').label('')
      .template('<ma-create-button entity-name="edges" size="sm" label="Create connection" default-values="{ clientId: entry.values.id }"></ma-create-button>'),
    nga.field('Variables', 'referenced_list')
      .targetEntity(nga.entity('nodes'))
      .targetReferenceField('clientId')
      .sortField('type')
      .targetFields([
        nga.field('name')
          .isDetailLink(true),
        nga.field('type'),
        nga.field('size')
          .label('Intensity'),
      ])
      .listActions(['edit', 'delete']),
    nga.field('Relations', 'referenced_list')
      .targetEntity(nga.entity('edges'))
      .targetReferenceField('clientId')
      .targetFields([
        nga.field('source'),
        nga.field('target'),
        nga.field('size')
          .label('Strength'),
      ])
      .listActions(['edit', 'delete']),
  ]);

  admin
    .addEntity(contact);

  return contact;
};
