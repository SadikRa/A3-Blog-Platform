import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  protected modelQuery: Query<T[], T>;
  protected query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  get queryResult() {
    return this.modelQuery;
  }

  search(searchableFields: string[]): this {
    const search = this.query.search as string | undefined;

    if (search) {
      const searchConditions = searchableFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      })) as FilterQuery<T>[];

      this.modelQuery = this.modelQuery.find({ $or: searchConditions });
    }

    return this;
  }

  sort(): this {
    const sortBy = (this.query.sortBy as string) || 'createdAt';
    const sortOrder = (this.query.sortOrder as string) === 'asc' ? '' : '-';
    this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`);
    return this;
  }

  filter(filterableFields: string[]): this {
    const filters = filterableFields.reduce((acc, field) => {
      if (this.query[field]) {
        acc[field] = this.query[field];
      }
      return acc;
    }, {} as Record<string, unknown>);

    if (this.query.filter) {
      filters['author'] = this.query.filter;
    }

    this.modelQuery = this.modelQuery.find(filters as FilterQuery<T>);
    return this;
  }
}

export default QueryBuilder;
