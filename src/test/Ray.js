// Ray.js

class Ray {
	constructor(mOrigin, mDirection) {
		this._origin = vec3.clone(mOrigin);
		this._direction = vec3.clone(mDirection);
	}

	at(t) {
		const target = vec3.clone(this._direction);
		vec3.scale(target, target, t);
		vec3.add(target, target, this._origin);

		return target;
	}


	lookAt(mTarget) {
		vec3.sub(this._direction, mTarget, this._origin);
		vec3.normalize(this._origin, this._origin);
	}

	closestPointToPoint(mPoint) {
		const result = vec3.create();
		vec3.sub(mPoint, this._origin);
		const directionDistance = vec3.dot(result, this._direction);

		if (directionDistance < 0) {
			return vec3.clone(this._origin);
		}

		vec3.copy(result, this._direction);
		vec3.scale(result, result, directionDistance);
		vec3.add(result, result, this._origin);

		return result;
	}


	distanceToPoint(mPoint) {
		return Math.sqrt(this.distanceSqToPoint(mPoint));
	}


	distanceSqToPoint(mPoint) {
		const v1 = vec3.create();

		vec3.sub(v1, mPoint, this._origin);
		const directionDistance = vec3.dot(v1, this._direction);

		if (directionDistance < 0) {
			return vec3.squaredDistance(this._origin, mPoint);
		}

		vec3.copy(v1, this._direction);
		vec3.scale(v1, v1, directionDistance);
		vec3.add(v1, v1, this._origin);
		return vec3.squaredDistance(v1, mPoint);
	}


	intersectsSphere(mCenter, mRadius) {
		return this.distanceToPoint(mCenter) <= mRadius;
	}


	intersectSphere(mCenter, mRadius) {
		const v1 = vec3.create();
		vec3.sub(v1, mCenter, this._origin);
		const tca = vec3.dot(v1, this._direction);
		const d2 = vec3.dot(v1, v1) - tca * tca;
		const radius2 = mRadius * mRadius;

		if(d2 > radius2) return null;

		const thc = Math.sqrt(radius2 - d2);

		const t0 = tca - thc;

		const t1 = tca + thc;

		if(t0 < 0 && t1 < 0) return null;

		if(t0 < 0) return this.at(t1);

		return this.at(t0);
	}


	distanceToPlane(mPlaneCenter, mNormal) {
		const denominator = vec3.dot(mNormal, this._direction);

		if(denominator === 0) {
		}
	}

}

export default Ray;